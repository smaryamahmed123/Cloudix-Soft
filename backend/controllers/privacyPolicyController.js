// controllers/privacyPolicyController.js
import PrivacyPolicy from '../models/PrivacyPolicy.js';

/**
 * @desc    Get Privacy Policy
 * @route   GET /api/privacy-policy
 * @access  Public
 */
export const getPolicy = async (req, res) => {
  try {
    let policy = await PrivacyPolicy.findOne();

    // If not found, create an empty policy
    if (!policy) {
      policy = new PrivacyPolicy({ sections: [] });
      await policy.save();
    }

    res.status(200).json(policy);
  } catch (error) {
    console.error('Error fetching policy:', error);
    res.status(500).json({ message: 'Server error while fetching policy.' });
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

    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ message: 'Invalid sections data.' });
    }

    let policy = await PrivacyPolicy.findOne();

    if (!policy) {
      policy = new PrivacyPolicy({ sections });
    } else {
      policy.sections = sections;
      policy.updatedAt = Date.now();
    }

    await policy.save();
    res.status(200).json({ message: 'Privacy Policy updated successfully.', policy });
  } catch (error) {
    console.error('Error updating policy:', error);
    res.status(500).json({ message: 'Failed to update policy.' });
  }
};

/**
 * @desc    Delete Privacy Policy (Optional)
 * @route   DELETE /api/privacy-policy
 * @access  Admin
 */
export const deletePolicy = async (req, res) => {
  try {
    await PrivacyPolicy.deleteMany({});
    res.status(200).json({ message: 'Privacy Policy deleted successfully.' });
  } catch (error) {
    console.error('Error deleting policy:', error);
    res.status(500).json({ message: 'Failed to delete policy.' });
  }
};
