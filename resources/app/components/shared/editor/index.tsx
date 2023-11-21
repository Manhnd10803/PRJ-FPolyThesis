/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import './editor.scss';

import { SharedAutocompleteContext } from './context/SharedAutocompleteContext';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import { Editor } from './editor';
import { RootNodes } from './nodes/RootNodes';
import { TableContext } from './plugins/TablePlugin';
import TypingPerfPlugin from './plugins/TypingPerfPlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import React from 'react';

const initialConfig = {
  editorState: null,
  namespace: 'FpolyZone Editor',
  nodes: [...RootNodes],
  onError: (error: Error) => {
    throw error;
  },
  theme: PlaygroundEditorTheme,
};

export const SupperEditor = React.forwardRef((props: any, ref: any): JSX.Element => {
  return (
    <div className="editor-wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div className="editor-shell">
                <Editor ref={ref} />
              </div>
              <TypingPerfPlugin />
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </div>
  );
});
