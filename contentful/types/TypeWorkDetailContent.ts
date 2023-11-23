import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeWorkDetailContentMediaSkeleton } from "./TypeWorkDetailContentMedia";

export interface TypeWorkDetailContentFields {
    title?: EntryFieldTypes.Symbol;
    subtitle?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.Text;
    bottomMargin: EntryFieldTypes.Boolean;
    workMedia?: EntryFieldTypes.EntryLink<TypeWorkDetailContentMediaSkeleton>;
}

export type TypeWorkDetailContentSkeleton = EntrySkeletonType<TypeWorkDetailContentFields, "workDetailContent">;
export type TypeWorkDetailContent<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeWorkDetailContentSkeleton, Modifiers, Locales>;
