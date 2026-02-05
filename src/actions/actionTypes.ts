export type ExecutableAction = "RESPOND_TO_POLL" | "DRAFT_FORUM_POST" | "NO_OP";

export interface ActionResult {
  action: ExecutableAction;
  success: boolean;
  message: string;
}
