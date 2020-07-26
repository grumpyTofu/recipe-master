export interface RecipeResults {
  count: number;
  results: Recipes;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  num_servings: number;
  user_ratings: Rating;
  thumbnail_url: string;
  instructions: Instructions;
  original_video_url: string;
  cook_time_minutes: number;
  prep_time_minutes: number;
}

export interface Recipes extends Array<Recipe>{}

export interface Instructions extends Array<Step>{}

export interface Step {
  display_text: string;
  position: number;
  start_time: number;
  end_time: number;
}

export interface Rating {
  count_positive: number;
  count_negative: number;
  score: number;
}
