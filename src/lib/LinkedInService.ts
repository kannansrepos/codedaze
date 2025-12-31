import axios from 'axios';

export const PostToLinkedIn = async (content: string, blogUrl: string) => {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_ID; // Format: urn:li:person:ABC12345

  if (!accessToken || !personUrn) {
    console.error('[LinkedInService] Missing credentials');
    return { success: false, error: 'LinkedIn credentials not configured' };
  }

  try {
    const response = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: personUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: 'ARTICLE',
            media: [
              {
                status: 'READY',
                description: {
                  text: 'Check out my latest blog post on CodeDaze!',
                },
                originalUrl: blogUrl,
                title: {
                  text: 'New Tech Post on CodeDaze',
                },
              },
            ],
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    console.error('[LinkedInService] Error:', err.response?.data || err.message);
    return {
      success: false,
      error: err.response?.data?.message || err.message || 'Unknown error'
    };
  }
};
