import { HackathonState } from "../state/hackathonState";
import { ForumState } from "../state/forumState";

export interface DecisionContext {
  hackathon: HackathonState;
  forum: ForumState;
}
