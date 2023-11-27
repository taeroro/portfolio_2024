import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeContentPwdFields {
    pwd: EntryFieldTypes.Symbol;
}

export type TypeContentPwdSkeleton = EntrySkeletonType<TypeContentPwdFields, "contentPwd">;
export type TypeContentPwd<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContentPwdSkeleton, Modifiers, Locales>;
