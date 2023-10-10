import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function LoginGoogle(){
  <>
  <GoogleOAuthProvider clientId="<your_client_id>">
  <GoogleLogin
    onSuccess={credentialResponse => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  </GoogleOAuthProvider>
  </>
}