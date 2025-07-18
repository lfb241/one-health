import { RefObject, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import OpenChemLib from 'openchemlib/full';

import React from 'react';
const StructureEditor: React.FC = () => {
    const [editor, setEditor] = useState();

    useEffect(() => {
        let newEditor = OpenChemLib.StructureEditor.createSVGEditor(
            'structureSearchEditor',
            1,
        );
        setEditor(newEditor);
    }, []);

    return (
        <div
            style={{ width: '100%', height: '100%', border: '1px solid black' }}
            id="structureSearchEditor"
        />
    );
};

export default StructureEditor;
