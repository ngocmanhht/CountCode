export type Result = {
  blocks: BlocksData[];
  resultText: string;
};

export type FrameType = {
  boundingCenterX: number;
  boundingCenterY: number;
  height: number;
  width: number;
  x: number;
  y: number;
};

export type CornerPointsType = [{x: number; y: number}];

export type ElementsData = [
  elementCornerPoints: CornerPointsType,
  elementFrame: FrameType,
  elementText: string,
];

export type LinesData = [
  lineCornerPoints: CornerPointsType,
  elements: ElementsData,
  lineFrame: FrameType,
  lineLanguages: string[] | [],
  lineText: string,
];

export type BlocksData = {
  blockFrame: FrameType;
  blockCornerPoints: CornerPointsType;
  lines: LinesData;
  blockLanguages: string[] | [];
  blockText: string;
};
