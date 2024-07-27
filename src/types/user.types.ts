interface Avatar {
    public_id: string;
    url: string;
  }
  
  export interface UserDocument {
    name: string;
    email: string;
    avatar: Avatar;
    cart: string[]; // Assuming ObjectId is stored as a string
    role: string;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
  }