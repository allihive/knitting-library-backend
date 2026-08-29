export interface SignupBody {
	email: string;
	password: string;
}

export interface LoginBody {
	email: string;
	password: string;
}

export interface TokenPayload {
	userId: string;
	email: string;
}

export interface RefreshBody {
	refreshToken: string;
}

export interface GoogleLoginBody {
	credential: string;
}