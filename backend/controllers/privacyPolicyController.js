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
        sections: [],
      });
    }

    res.status(200).json(policy);
  } catch (error) {
    console.error(
      "Error fetching privacy policy:",
      error
    );

    res.status(500).json({
      message:
        "Server error while fetching privacy policy.",
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
    const { sections } = req.body;

    if (!Array.isArray(sections)) {
      return res.status(400).json({
        message: "Invalid sections data.",
      });
    }

    /*
     * Clean and validate sections
     */

    const cleanedSections = sections
      .map((section) => ({
        title:
          typeof section.title === "string"
            ? section.title.trim()
            : "",

        content:
          typeof section.content === "string"
            ? section.content.trim()
            : "",
      }))
      .filter(
        (section) =>
          section.title || section.content
      );

    /*
     * Prevent accidental empty headings
     */

    const invalidSection = cleanedSections.find(
      (section) =>
        !section.title || !section.content
    );

    if (invalidSection) {
      return res.status(400).json({
        message:
          "Every section must have a heading and content.",
      });
    }

    let policy = await PrivacyPolicy.findOne();

    if (!policy) {
      policy = new PrivacyPolicy({
        sections: cleanedSections,
      });
    } else {
      policy.sections = cleanedSections;
    }

    await policy.save();

    res.status(200).json({
      message:
        "Privacy Policy updated successfully.",
      policy,
    });
  } catch (error) {
    console.error(
      "Error updating privacy policy:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update Privacy Policy.",
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

    res.status(200).json({
      message:
        "Privacy Policy deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Error deleting privacy policy:",
      error
    );

    res.status(500).json({
      message:
        "Failed to delete Privacy Policy.",
    });
  }
};