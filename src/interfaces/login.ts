export interface PostForAccessTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export interface KakaoAuthInfo {
  connected_at: string;
  id: number;
  kakao_account: {
    email: string;
    email_needs_agreement: boolean;
    has_email: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
  };

  profile: {
    is_default_image: boolean;
    nickname: string;
    profile_image_url: string;
    thumbnail_image_url: string;
  };
  profile_image_needs_agreement: boolean;
  profile_nickname_needs_agreement: boolean;
}
