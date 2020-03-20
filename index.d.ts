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
  }

  interface CharsetNode extends BaseNode {
    type: 'charset';
    ranges: string[];
    classes: string[];
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

  export function parse(regex: string): AST;

  export const Raphael: RaphaelStatic;

  export function visualize(ast: AST, flag: string, paper: RaphaelPaper);
}