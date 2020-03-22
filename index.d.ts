declare module 'regulex-cjs' {

  export type Node = ExactNode | CharsetNode | GroupNode | ChoiceNode | AssertNode | DotNode | BackrefNode | EmptyNode;

  interface BaseNode {
    type: string;
    raw: string;
    indices: [ number, number ];
    repeat?: {
      min: number;
      max: number;
      nonGreedy: boolean;
    }
  }

  interface ExactNode extends BaseNode {
    type: 'exact';
    chars: string;
  }

  interface CharsetNode extends BaseNode {
    type: 'charset';
    ranges: string[];
    classes: string[];
    chars: string;
    exclude: boolean;
  }

  interface GroupNode extends BaseNode {
    type: 'group';
    nonCapture?: boolean;
    num: number;
    sub: Node[],
    endParenIndex: number;
  }

  interface ChoiceNode extends BaseNode {
    type: 'choice';
    branches: Array<Node>[];
  }

  interface AssertNodeWithSub {
    type: 'assert';
    assertionType: 'AssertLookahead' | 'AssertNegativeLookahead';
    sub: Node[];
  }

  interface AssertNodeWithoutSub {
    type: 'assert';
    assertionType: 'AssertNonWordBoundary' | 'AssertWordBoundary' | 'AssertEnd' | 'AssertBegin';
  }

  type AssertNode = AssertNodeWithSub | AssertNodeWithoutSub;

  interface DotNode {
    type: 'dot';
  }

  interface BackrefNode {
    type: 'backref';
    num: number;
  }

  interface EmptyNode {
    type: 'empty'
  }

  export interface AST {
    raw: string;
    tree: Node[]
    groupCount: number;
  }

  interface IVisualizeColorSet {
    startPoint?: string;
    endPoint?: string;
    background?: string;
    dotBackground?: string;
    dotText?: string;
    exactBackground?: string;
    backrefBackground?: string;
    backrefText?: string;
    charsetCharBackground?: string;
    charsetCharText?: string;
    charsetClassBackground?: string;
    charsetClassText?: string;
    charsetRangeBackground?: string;
    charsetRangeText?: string;
    charsetBoxExcludeBackground?: string;
    charsetBoxBackground?: string;
    charsetLabelExclude?: string;
    assertNonWordBoundaryBackground?: string;
    assertNonWordBoundaryText?: string;
    assertWordBoundaryBackground?: string;
    assertWordBoundaryText?: string;
    assertEndBackground?: string;
    assertEndText?: string;
    assertBeginBackground?: string;
    assertBeginText?: string;
    repeatPath?: string;
    smoothPath?: string;
    normalPath?: string;
    greedySkipPath?: string;
    nonGreedySkipPath?: string;
  }

  interface IVisualizeOption {
    color?: IVisualizeColorSet;
  }

  export function parse(regex: string): AST;

  export const Raphael: any;

  export function visualize(ast: AST, flag: string, paper: any, options?: IVisualizeOption);
}
