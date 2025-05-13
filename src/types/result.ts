export type Result = {
  blocks: BlocksData[];
  resultText: string;
};

type FrameType = {
  boundingCenterX: number;
  boundingCenterY: number;
  height: number;
  width: number;
  x: number;
  y: number;
};

type CornerPointsType = [{x: number; y: number}];

type ElementsData = [
  elementCornerPoints: CornerPointsType,
  elementFrame: FrameType,
  elementText: string,
];

type LinesData = [
  lineCornerPoints: CornerPointsType,
  elements: ElementsData,
  lineFrame: FrameType,
  lineLanguages: string[] | [],
  lineText: string,
];

type BlocksData = {
  blockFrame: FrameType;
  blockCornerPoints: CornerPointsType;
  lines: LinesData;
  blockLanguages: string[] | [];
  blockText: string;
};
