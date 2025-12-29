import { Button, TextField, Box, MenuItem } from "@mui/material";
import { useState } from "react";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AddWebsite = () => {
    const [form, setForm] = useState({});

    const submit = async () => {
        const data = new FormData();
        data.append("title", form.title);
        data.append("link", form.link);
        data.append("category", form.category);
        data.append("image", form.image);

        await fetch(`${backendURL}/api/websites`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
            body: data,
        });

        alert("Website Added");
    };

    return (
        <Box>
            <TextField label="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
            <TextField label="Link" onChange={e => setForm({ ...form, link: e.target.value })} />
            <TextField select label="Category" onChange={e => setForm({ ...form, category: e.target.value })}>
                <MenuItem value="static">Static</MenuItem>
                <MenuItem value="ecommerce">E-commerce</MenuItem>
            </TextField>
            <input type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
            <Button onClick={submit}>Add Website</Button>
        </Box>
    );
};

export default AddWebsite;
