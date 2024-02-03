export interface RecipeInfo {
  comboItemId: number;
  orderNumber: number;
  description: string;
}

export interface Comment {
  replyId: number;
  writerName: string;
  writerEmail: string;
  isEditable: boolean;
  content: string;
  issuedAt: string;
}
