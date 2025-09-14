
import { SceneData } from './types';

export const INITIAL_TIME = 25;
export const PLATFORM_WIDTH_PERCENT = 85;
export const CHARACTER_SPEED = 10;

export const SCENE_DATA: SceneData[] = [
  {
    id: 1,
    title: "The Hungry Child",
    description: "A child asks a vendor for leftover food on the platform; the vendor looks hesitant.",
    choices: [
      { text: "Buy something quickly and give it to the child", timeCost: 4, consequence: "A small act of kindness brightens a child's day." },
      { text: "Feel bad but walk on", timeCost: 2, consequence: "You feel a pang of guilt but prioritize your journey." },
      { text: "Walk away without looking", timeCost: 0, consequence: "You choose to remain uninvolved." },
      { text: "Wait to see if the vendor helps", timeCost: 1, consequence: "You observe, hoping for a positive outcome from others." },
    ],
    timePressureText: "Metro arriving in 40 seconds",
    triggerPosition: 15,
  },
  {
    id: 2,
    title: "The Mocked Artist",
    description: "A young student is quietly displaying their artwork when a group starts mocking and laughing loudly.",
    choices: [
      { text: "Ask them to stop / stand near the student", timeCost: 5, consequence: "Your intervention provides silent support to the artist." },
      { text: "Feel upset but keep walking", timeCost: 2, consequence: "You disagree with the bullies but avoid confrontation." },
      { text: "Glance and ignore", timeCost: 0, consequence: "You notice the situation but choose not to engage." },
      { text: "Wait, hoping someone intervenes", timeCost: 1, consequence: "You hope for another's courage to resolve the conflict." },
    ],
    timePressureText: "Metro arriving in 35 seconds",
    triggerPosition: 35,
  },
  {
    id: 3,
    title: "The Disoriented Man",
    description: "A blind man with a white cane appears disoriented, trying to find the exit stairs.",
    choices: [
      { text: "Speak up and gently guide him", timeCost: 6, consequence: "You take a moment to provide clear and direct assistance." },
      { text: "Feel anxious but do nothing", timeCost: 3, consequence: "Your anxiety prevents you from offering help." },
      { text: "Step aside silently", timeCost: 0, consequence: "You make way, assuming he will manage on his own." },
      { text: "Wait for someone else to step in", timeCost: 1, consequence: "You pause, expecting someone more qualified to help." },
    ],
    timePressureText: "Metro arriving in 30 seconds",
    triggerPosition: 55,
  },
  {
    id: 4,
    title: "The Collapse",
    description: "A person collapses suddenly on the platform with a visible injury and no one reacts at first.",
    choices: [
      { text: "Approach and assist / alert security", timeCost: 8, consequence: "You are the first to react in a critical emergency." },
      { text: "Freeze, heart racing but do nothing", timeCost: 3, consequence: "The shock of the event leaves you immobilized." },
      { text: "Move away and avoid the area", timeCost: 0, consequence: "You distance yourself from the distressing scene." },
      { text: "Look around waiting for others to step in", timeCost: 1, consequence: "You search the crowd for a leader to emerge." },
    ],
    timePressureText: "Metro in 15 seconds, final boarding",
    triggerPosition: 75,
  },
  {
    id: 5,
    title: "The Dropped Phone",
    description: "Someone drops their phone onto the metro tracks just as the train is pulling in.",
    choices: [
      { text: "Alert staff / help recover it", timeCost: 5, consequence: "You act quickly to prevent loss and potential danger." },
      { text: "Watch helplessly from a distance", timeCost: 2, consequence: "You feel for them but see no safe way to help." },
      { text: "Keep walking toward the metro", timeCost: 0, consequence: "You stay focused on catching your train." },
      { text: "Wait to see if someone else responds", timeCost: 1, consequence: "You observe, curious about the outcome but hesitant to act." },
    ],
    timePressureText: "Metro doors closing in 10 seconds",
    triggerPosition: 95,
  },
];
