export interface CommentsProfile {
  score: number;
  content: string;
  cocktail_id: number;
  cocktail_name: string;
  comment_id: number;
}

export interface CocktailsProfile {
  cocktail_id: number;
  avg_rating: number;
  cocktail_name: string;
  ingredient_name: string;
  family: string;
}

export interface UserProfile {
  pseudo: string;
  image: string;
  color: string;
  email: string;
  password: string;
  comments: CommentsProfile[] | null;
  cocktails: CocktailsProfile[] | null;
}

export interface UserInfoForm {
  pseudo: string;
  email: string;
  password: string;
  color: string;
  image: string;
}
