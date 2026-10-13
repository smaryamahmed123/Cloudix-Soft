import PrivacyPolicy from "../models/PrivacyPolicy.js";

/**
 * @desc    Get Privacy Policy
 * @route   GET /api/privacy-policy
 * @access  Public
 */
export const getPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne().lean();

    if (!policy) {
      return res.status(200).json({
        intro: "",
        sections: [],
        closing: { title: "", text: "" },
      });
    }

    return res.status(200).json({
      intro: policy.intro || "",
      sections: Array.isArray(policy.sections) ? policy.sections : [],
      closing: {
        title: policy.closing?.title || "",
        text: policy.closing?.text || "",
      },
      updatedAt: policy.updatedAt || null,
    });
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return res.status(500).json({
      message: "Server error while fetching privacy policy.",
    });
  }
};

/**
 * @desc    Update Privacy Policy
 * @route   POST /api/privacy-policy/update
 * @access  Admin
 */
export const updatePolicy = async (req, res) => {
  try {
    const { intro = "", sections, closing = {} } = req.body;

    if (typeof intro !== "string") {
      return res.status(400).json({ message: "Introduction must be text." });
    }

    if (!Array.isArray(sections)) {
      return res.status(400).json({ message: "Invalid sections data." });
    }

    if (closing !== null && (typeof closing !== "object" || Array.isArray(closing))) {
      return res.status(400).json({ message: "Closing banner data is invalid." });
    }

    const cleanedSections = sections
      .map((section) => ({
        title: typeof section?.title === "string" ? section.title.trim() : "",
        content: typeof section?.content === "string" ? section.content.trim() : "",
      }))
      .filter((section) => section.title || section.content);

    const invalidSection = cleanedSections.find(
      (section) => !section.title || !section.content
    );

    if (invalidSection) {
      return res.status(400).json({
        message: "Every section must have both a heading and content.",
      });
    }

    const cleanedClosing = {
      title: typeof closing?.title === "string" ? closing.title.trim() : "",
      text: typeof closing?.text === "string" ? closing.text.trim() : "",
    };

    if (cleanedClosing.title.length > 200) {
      return res.status(400).json({
        message: "Closing title cannot exceed 200 characters.",
      });
    }

    const policy = await PrivacyPolicy.findOneAndUpdate(
      {},
      {
        $set: {
          intro: intro.trim(),
          sections: cleanedSections,
          closing: cleanedClosing,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      message: "Privacy Policy updated successfully.",
      policy,
    });
  } catch (error) {
    console.error("Error updating privacy policy:", error);
    return res.status(500).json({
      message: "Failed to update Privacy Policy.",
    });
  }
};

/**
 * @desc    Delete Privacy Policy
 * @route   DELETE /api/privacy-policy
 * @access  Admin
 */
export const deletePolicy = async (req, res) => {
  try {
    await PrivacyPolicy.deleteMany({});
    return res.status(200).json({
      message: "Privacy Policy deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting privacy policy:", error);
    return res.status(500).json({
      message: "Failed to delete Privacy Policy.",
    });
  }
};
