import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeSocialSkeleton } from "./TypeSocial";

export interface TypeFooterFields {
    name: EntryFieldTypes.Symbol;
    copyright: EntryFieldTypes.Symbol;
    socialData: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSocialSkeleton>>;
}

export type TypeFooterSkeleton = EntrySkeletonType<TypeFooterFields, "footer">;
export type TypeFooter<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeFooterSkeleton, Modifiers, Locales>;
