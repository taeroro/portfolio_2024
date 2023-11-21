import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSocialFields {
    type: EntryFieldTypes.Symbol;
    displayContent: EntryFieldTypes.Symbol;
    link: EntryFieldTypes.Symbol;
}

export type TypeSocialSkeleton = EntrySkeletonType<TypeSocialFields, "social">;
export type TypeSocial<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSocialSkeleton, Modifiers, Locales>;
