
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Player {
  name: string;
  gender: Gender;
}

export interface Choice {
  text: string;
  timeCost: number;
  consequence: string;
}

export interface SceneData {
  id: number;
  title: string;
  description: string;
  choices: Choice[];
  timePressureText: string;
  triggerPosition: number;
}

export enum GameStatus {
  CHARACTER_SELECTION,
  PLAYING,
  SCENE_PROMPT,
  FINISHED,
}

export interface PlayerChoice {
    sceneTitle: string;
    choiceText: string;
    timeCost: number;
}
