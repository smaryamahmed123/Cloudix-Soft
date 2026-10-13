import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddRounded,
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  DeleteOutlineRounded,
  ExpandMoreRounded,
  SaveRounded,
} from "@mui/icons-material";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const C = {
  green: "#5E7A0F",
  greenSoft: "rgba(118,153,20,0.10)",
  ink: "#111E2C",
  line: "rgba(7,21,31,0.12)",
  page: "#F4F6F8",
};

const uid = () => Math.random().toString(36).slice(2, 10);
const words = (t) => t.trim().split(/\s+/).filter(Boolean).length;

const buildPayload = (intro, closing, sections) => ({
  intro: intro.trim(),
  closing: { title: closing.title.trim(), text: closing.text.trim() },
  sections: sections.map((s) => ({
    title: s.title.trim(),
    content: s.content.trim(),
  })),
});

/* A collapsible row. Defined outside the page so inputs never remount. */
const Row = ({ badge, title, meta, open, onToggle, actions, invalid, children }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 2,
      border: "1px solid",
      borderColor: invalid ? "error.main" : C.line,
      bgcolor: "#fff",
      overflow: "hidden",
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      onClick={onToggle}
      sx={{
        px: 2,
        py: 1.25,
        cursor: "pointer",
        "&:hover": { bgcolor: "rgba(7,21,31,0.025)" },
      }}
    >
      <Box
        sx={{
          minWidth: 34,
          height: 34,
          px: 0.5,
          borderRadius: 1,
          display: "grid",
          placeItems: "center",
          fontWeight: 700,
          fontSize: "0.8rem",
          color: C.green,
          bgcolor: C.greenSoft,
        }}
      >
        {badge}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: 600, color: C.ink }}>
          {title}
        </Typography>
        <Typography variant="caption" color={invalid ? "error" : "text.secondary"}>
          {meta}
        </Typography>
      </Box>
      <Box onClick={(e) => e.stopPropagation()}>{actions}</Box>
      <ExpandMoreRounded
        sx={{
          color: "text.secondary",
          transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "none",
        }}
      />
    </Stack>
    <Collapse in={open} unmountOnExit>
      <Box sx={{ p: { xs: 2, sm: 3 }, borderTop: `1px solid ${C.line}` }}>{children}</Box>
    </Collapse>
  </Paper>
);

const PrivacyPolicyAdmin = () => {
  const [intro, setIntro] = useState("");
  const [closing, setClosing] = useState({ title: "", text: "" });
  const [sections, setSections] = useState([]);
  const [open, setOpen] = useState({});
  const [saved, setSaved] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const applyPolicy = useCallback((d = {}) => {
    const nextIntro = d.intro || "";
    const nextClosing = {
      title: d.closing?.title || "",
      text: d.closing?.text || "",
    };
    const nextSections = (d.sections || []).map((s) => ({
      uid: uid(),
      title: s.title || "",
      content: s.content || "",
    }));
    setIntro(nextIntro);
    setClosing(nextClosing);
    setSections(nextSections);
    setOpen({});
    setTouched(false);
    setSaved(JSON.stringify(buildPayload(nextIntro, nextClosing, nextSections)));
  }, []);

  const fetchPolicy = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(`${backendURL}/api/privacy-policy`);
      applyPolicy(data);
    } catch (err) {
      console.error("Error fetching policy:", err);
      setError(err?.response?.data?.message || "Could not load the privacy policy.");
    } finally {
      setLoading(false);
    }
  }, [applyPolicy]);

  useEffect(() => {
    fetchPolicy();
  }, [fetchPolicy]);

  const dirty = useMemo(
    () => !loading && JSON.stringify(buildPayload(intro, closing, sections)) !== saved,
    [loading, intro, closing, sections, saved]
  );

  /* Warn before closing the tab with unsaved edits. */
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const updateSection = (id, field, value) => {
    setSections((cur) => cur.map((s) => (s.uid === id ? { ...s, [field]: value } : s)));
    setSuccess("");
  };

  const addSection = () => {
    const id = uid();
    setSections((cur) => [...cur, { uid: id, title: "", content: "" }]);
    setOpen((o) => ({ ...o, [id]: true }));
    setSuccess("");
  };

  const moveSection = (index, dir) => {
    setSections((cur) => {
      const next = [...cur];
      const target = index + dir;
      if (target < 0 || target >= next.length) return cur;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setSuccess("");
  };

  const confirmDelete = () => {
    setSections((cur) => cur.filter((s) => s.uid !== deleteTarget));
    setDeleteTarget(null);
    setSuccess("");
  };

  const isPartial = (s) => {
    const t = s.title.trim();
    const c = s.content.trim();
    return Boolean(t || c) && !(t && c);
  };

  const handleSave = async () => {
    setSuccess("");
    setError("");
    setTouched(true);

    const partial = sections.filter(isPartial);
    if (partial.length) {
      setOpen((o) => ({ ...o, ...Object.fromEntries(partial.map((s) => [s.uid, true])) }));
      setError(
        `${partial.length} section${partial.length > 1 ? "s are" : " is"} missing a heading or content. Fill them in or delete them.`
      );
      return;
    }

    const payload = buildPayload(intro, closing, sections);
    payload.sections = payload.sections.filter((s) => s.title && s.content);

    try {
      setSaving(true);
      const { data } = await axios.post(`${backendURL}/api/privacy-policy/update`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      applyPolicy(data.policy || payload);
      setSuccess("Changes saved.");
    } catch (err) {
      console.error("Update failed:", err);
      setError(err?.response?.data?.message || "Could not save changes. Your edits are still here.");
    } finally {
      setSaving(false);
    }
  };

  const allOpen = sections.length > 0 && sections.every((s) => open[s.uid]);
  const toggleAll = () =>
    setOpen((o) => ({
      ...o,
      ...Object.fromEntries(sections.map((s) => [s.uid, !allOpen])),
    }));

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: C.page, pb: 8 }}>
      {/* Sticky bar: save is always reachable, state is always visible */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "rgba(244,246,248,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <Container maxWidth="md">
          <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 1.5 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>
                Privacy policy
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {sections.length} sections, shown on the public page in this order
              </Typography>
            </Box>
            {dirty ? (
              <Chip size="small" color="warning" variant="outlined" label="Unsaved changes" />
            ) : (
              !loading && <Chip size="small" variant="outlined" label="All changes saved" />
            )}
            {dirty && (
              <Button onClick={() => applyPolicy(JSON.parse(saved))} disabled={saving} color="inherit">
                Discard
              </Button>
            )}
            <Button
              variant="contained"
              disableElevation
              onClick={handleSave}
              disabled={saving || loading || !dirty}
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveRounded />}
              sx={{ bgcolor: C.green, fontWeight: 700, "&:hover": { bgcolor: "#4C650C" } }}
            >
              {saving ? "Saving" : "Save changes"}
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pt: 3 }}>
        {success && (
          <Alert severity="success" onClose={() => setSuccess("")} sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Stack alignItems="center" sx={{ py: 10 }}>
            <CircularProgress sx={{ color: C.green }} />
          </Stack>
        ) : (
          <Stack spacing={1.5}>
            <Typography variant="body2" color="text.secondary">
              Each line is its own paragraph. Start a line with <b>- </b> for a bullet. Use{" "}
              <b>**bold**</b> and <b>[text](https://…)</b> for emphasis and links. Numbers are added
              automatically from the order below, so leave them out of headings.
            </Typography>

            <Row
              badge="Intro"
              title="Introduction"
              meta={intro.trim() ? `${words(intro)} words` : "Empty. The intro card is hidden on the public page."}
              open={!!open.intro}
              onToggle={() => toggle("intro")}
            >
              <TextField
                label="Introduction text"
                value={intro}
                onChange={(e) => {
                  setIntro(e.target.value);
                  setSuccess("");
                }}
                fullWidth
                multiline
                minRows={4}
              />
            </Row>

            {sections.length > 0 && (
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
                <Typography sx={{ fontWeight: 700, color: C.ink }}>Sections</Typography>
                <Button size="small" color="inherit" onClick={toggleAll}>
                  {allOpen ? "Collapse all" : "Expand all"}
                </Button>
              </Stack>
            )}

            {sections.map((s, i) => {
              const invalid = touched && isPartial(s);
              const empty = !s.title.trim() && !s.content.trim();
              return (
                <Row
                  key={s.uid}
                  badge={String(i + 1).padStart(2, "0")}
                  title={s.title.trim() || "Untitled section"}
                  meta={
                    invalid
                      ? "Needs both a heading and content"
                      : empty
                        ? "Empty. Discarded on save."
                        : `${words(s.content)} words`
                  }
                  invalid={invalid}
                  open={!!open[s.uid]}
                  onToggle={() => toggle(s.uid)}
                  actions={
                    <Stack direction="row">
                      <Tooltip title="Move up">
                        <span>
                          <IconButton size="small" disabled={i === 0} onClick={() => moveSection(i, -1)} aria-label={`Move section ${i + 1} up`}>
                            <ArrowUpwardRounded fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Move down">
                        <span>
                          <IconButton size="small" disabled={i === sections.length - 1} onClick={() => moveSection(i, 1)} aria-label={`Move section ${i + 1} down`}>
                            <ArrowDownwardRounded fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Delete section">
                        <IconButton size="small" color="error" onClick={() => setDeleteTarget(s.uid)} aria-label={`Delete section ${i + 1}`}>
                          <DeleteOutlineRounded fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                >
                  <TextField
                    label="Heading"
                    value={s.title}
                    onChange={(e) => updateSection(s.uid, "title", e.target.value)}
                    error={invalid && !s.title.trim()}
                    helperText={invalid && !s.title.trim() ? "Add a heading" : " "}
                    fullWidth
                    inputProps={{ maxLength: 200 }}
                    placeholder="What information do we collect?"
                  />
                  <TextField
                    label="Content"
                    value={s.content}
                    onChange={(e) => updateSection(s.uid, "content", e.target.value)}
                    error={invalid && !s.content.trim()}
                    helperText={invalid && !s.content.trim() ? "Add content" : " "}
                    fullWidth
                    multiline
                    minRows={6}
                    placeholder={"We collect information when you:\n- Contact us\n- Subscribe to updates"}
                  />
                </Row>
              );
            })}

            {sections.length === 0 && (
              <Paper elevation={0} sx={{ p: 4, textAlign: "center", border: `1px dashed ${C.line}`, bgcolor: "transparent" }}>
                <Typography sx={{ fontWeight: 600 }}>No sections yet</Typography>
                <Typography variant="body2" color="text.secondary">
                  Add a section to start building the policy.
                </Typography>
              </Paper>
            )}

            <Button
              onClick={addSection}
              startIcon={<AddRounded />}
              sx={{ alignSelf: "flex-start", color: C.green, fontWeight: 700 }}
            >
              Add section
            </Button>

            <Typography sx={{ fontWeight: 700, color: C.ink, pt: 2 }}>Closing banner</Typography>
            <Row
              badge="End"
              title={closing.title.trim() || "Closing banner"}
              meta={closing.text.trim() ? `${words(closing.text)} words` : "Empty. Public page falls back to default text."}
              open={!!open.closing}
              onToggle={() => toggle("closing")}
            >
              <TextField
                label="Title"
                value={closing.title}
                onChange={(e) => {
                  setClosing((c) => ({ ...c, title: e.target.value }));
                  setSuccess("");
                }}
                fullWidth
                sx={{ mb: 2.5 }}
                inputProps={{ maxLength: 200 }}
              />
              <TextField
                label="Text"
                value={closing.text}
                onChange={(e) => {
                  setClosing((c) => ({ ...c, text: e.target.value }));
                  setSuccess("");
                }}
                fullWidth
                multiline
                minRows={3}
              />
            </Row>
          </Stack>
        )}
      </Container>

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete this section?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            It is removed from the page now and from the public policy once you save. Use Discard to
            bring it back before saving.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setDeleteTarget(null)}>
            Keep section
          </Button>
          <Button color="error" onClick={confirmDelete}>
            Delete section
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrivacyPolicyAdmin;