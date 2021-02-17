export class ProfileResponseModel {
  status: number;
  data: {
    name: string;
    id: number;
    iat: number;
    exp: number;
  };
  message: string;
}
