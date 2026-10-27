import {
    MantineColor,
    TreeNodeData,
    TreeSelect as MantineTreeSelect,
} from '@mantine/core';
import { BoxProps } from 'props/box';
import { __ClearButtonProps } from 'props/button';
import { ComboboxLikeProps } from 'props/combobox';
import { DashBaseProps, PersistenceProps } from 'props/dash';
import { __BaseInputProps, ClearSectionMode } from 'props/input';
import { ScrollAreaProps } from 'props/scrollarea';
import { StylesApiProps } from 'props/styles';
import React from 'react';
import { getLoadingState, setPersistence } from '../../../utils/dash3';

interface Props
    extends
        BoxProps,
        __BaseInputProps,
        Pick<ComboboxLikeProps, 'comboboxProps' | 'maxDropdownHeight'>,
        StylesApiProps,
        DashBaseProps,
        PersistenceProps {
    /** Tree data. Each node must have a unique string value and a label, and can have nested children. */
    data: TreeNodeData[];
    /** Selection mode, `'single'` by default. Checkbox mode supports parent-child cascade. */
    mode?: 'single' | 'multiple' | 'checkbox';
    /** Controlled value. A string or null in single mode, a list of strings in multiple and checkbox modes. */
    value?: string | string[] | null;
    /** Disables parent-child cascade in checkbox mode, `false` by default. Use with `checkedStrategy='child'` so the value contains exactly the checked nodes; the `'all'` and `'parent'` strategies recompute the value from the tree hierarchy and may drop or add nodes. */
    checkStrictly?: boolean;
    /** Determines which checked nodes appear in the value and pills in checkbox mode, `'child'` by default. When `checkStrictly` is enabled, only `'child'` is reliable. */
    checkedStrategy?: 'all' | 'parent' | 'child';
    /** Controlled list of expanded node values. Updated when nodes are expanded or collapsed. */
    expandedValues?: string[];
    /** Expands all nodes on initial render when expandedValues is not set, `false` by default. */
    defaultExpandAll?: boolean;
    /** Also expands or collapses a parent when its label is clicked, `false` by default. In single and multiple modes, parent nodes cannot be selected. */
    expandOnClick?: boolean;
    /** Enables search filtering, `false` by default. */
    searchable?: boolean;
    /** Controlled search value. Updated when the search changes. */
    searchValue?: string;
    /** Message displayed when no nodes match the search. */
    nothingFoundMessage?: React.ReactNode;
    /** Allows deselecting the selected value in single mode, `true` by default. */
    allowDeselect?: boolean;
    /** Displays a clear button when the component has a value, `false` by default. */
    clearable?: boolean;
    /** Determines how the clear button and rightSection are rendered, `'both'` by default. */
    clearSectionMode?: ClearSectionMode;
    /** Props passed down to the clear button. */
    clearButtonProps?: __ClearButtonProps;
    /** Maximum number of selected values in multiple and checkbox modes, `Infinity` by default. */
    maxValues?: number;
    /** Maximum number of displayed pills before an overflow indicator is shown. */
    maxDisplayedValues?: number;
    /** Content displayed in the overflow indicator. */
    maxDisplayedValuesContent?: React.ReactNode;
    /** Displays tree connection lines, `true` by default. */
    withLines?: boolean;
    /** Props passed down to the hidden input. */
    hiddenInputProps?: object;
    /** Divider used to separate values in the hidden input, `','` by default. */
    hiddenInputValuesDivider?: string;
    /** Props passed down to the dropdown ScrollArea. */
    scrollAreaProps?: ScrollAreaProps;
    /** Color of the expand and collapse chevron. */
    chevronColor?: MantineColor;
    /** Accessible labels for the expand and collapse chevron buttons. */
    chevronAriaLabels?: {
        /** Label for a collapsed node's expand button, `'Expand'` by default. */
        expand?: string;
        /** Label for an expanded node's collapse button, `'Collapse'` by default. */
        collapse?: string;
    };
    /** Controlled dropdown opened state. Updated when the dropdown opens or closes. */
    dropdownOpened?: boolean;
    /** Clears the search when the selection changes, `true` by default. */
    clearSearchOnChange?: boolean;
    /** Opens the dropdown on focus in searchable mode, `true` by default. */
    openOnFocus?: boolean;
}

/** Select values from a tree with single, multiple, or cascading checkbox selection. */
const TreeSelect = ({
    setProps,
    persistence,
    persisted_props,
    persistence_type,
    loading_state,
    mode = 'single',
    value,
    ...others
}: Props) => {
    if (
        value != null &&
        (mode === 'single'
            ? typeof value !== 'string'
            : !Array.isArray(value) ||
              value.some((item) => typeof item !== 'string'))
    ) {
        throw new Error(
            'TreeSelect: `value` must be a string or null in single mode, or a list of strings in multiple and checkbox modes'
        );
    }

    return (
        <MantineTreeSelect
            data-dash-is-loading={getLoadingState(loading_state) || undefined}
            {...others}
            mode={mode}
            value={value ?? (mode === 'single' ? null : [])}
            onChange={(value) => setProps({ value })}
            onSearchChange={(searchValue) => setProps({ searchValue })}
            onExpandedChange={(expandedValues) => setProps({ expandedValues })}
            onDropdownOpen={() => setProps({ dropdownOpened: true })}
            onDropdownClose={() => setProps({ dropdownOpened: false })}
        />
    );
};

setPersistence(TreeSelect);

export default TreeSelect;
