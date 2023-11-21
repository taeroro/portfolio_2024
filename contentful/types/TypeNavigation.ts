import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeSocialSkeleton } from "./TypeSocial";

export interface TypeNavigationFields {
    name: EntryFieldTypes.Symbol;
    menuIcon: EntryFieldTypes.Symbol;
    navigationLinks: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    socialData: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSocialSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;
