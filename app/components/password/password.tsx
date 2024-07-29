"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FormEvent } from 'react'

/****************************************************/
/*                                                  */
/* Password Component                               */
/*                                                  */
/****************************************************/

export default function Password() {

  /************** Defining variables ***************/
  const title = "Do you have the password?"
  const description = "This content is protected. Please enter the password below to access.\n To request access, please contact "
  const contact = "hello@ryan.fan"
  const inputPlaceholder = "Enter password here..."
  const iconPath: string = '/img/key.svg'
  const helperMessage = "Password is incorrect."

  const [password, setPassword] = useState('')
  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const [loading, setLoading] = useState(false);

  /************** Style classNames ***************/
  const styles = {
    pwdContainer: [
      'w-full h-svh-screen min-h-[600px]',
      'pt-[72px] px-8',
      'max-sm:px-2 max-sm:pt-[46px]',
    ].join(' '),
    contentContainer: [
      'py-16',
      'grid grid-cols-12 gap-8 gap-y-8',
      'max-sm:py-10 max-sm:gap-y-4'
    ].join(' '),
    sectionTitleWrapper: [
      'col-span-6',
      'font-bold h2-text',
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    descriptionWrapper: [
      'col-span-6 row-start-2',
      'font-medium leading-6 body-text whitespace-pre-line',
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    emailLink: [
      'no-underline border-solid border-primary border-b-2',
      'transition duration-300',
      'hover:border-highlight hover:bg-highlight hover:text-white',
      // 'max-sm:border-b-2',
    ].join(' '),

    searchContainer: [
      'col-span-6 row-start-3',
      'flex flex-col gap-8',
      'max-lg:col-span-12 max-xl:col-span-10 max-sm:gap-4',
    ].join(' '),
    innerContainer: [
      'w-full',
      'flex flex-col gap-2',
    ].join(' '),
    inputContainer: [
      'w-full py-1 pl-9 rounded-none',
      'border-b-4 border-primary',
      'font-bold title-text tracking-normal',
      'placeholder:text-secondary',
      'focus:outline-none',
      'max-sm:border-b-[3px]',
    ].join(' '),
    pwdIcon: [
      'absolute pointer-events-none px-1 pt-3',
      'max-sm:pt-2'
    ].join(' '),
    helper: [
      'font-medium leading-6 text-red-600 body-text',
    ].join(' '),
    resultContainer: [
      'w-full',
      'font-medium leading-6 whitespace-break-spaces body-text',
    ].join(' '),
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const request = await fetch('/api', {
      body: JSON.stringify({password}),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    });
 
    if (await request.status !== 200) {
      (e.target as HTMLFormElement).reset()
      return setPasswordIncorrect(true), setLoading(false);
    }
    else 
      window.location.reload();
  }


  return (
    <div className={styles.pwdContainer}>
      <div className={styles.contentContainer}>


        <div className={styles.sectionTitleWrapper}>
          <h2>{title}</h2>
        </div>

        <div className={styles.descriptionWrapper}>
          <p className="inline">{description}</p>
          <a className={styles.emailLink} href={contact}>{contact}</a>  
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.innerContainer}>
            <form onSubmit={handleSubmit}>
              <i className={styles.pwdIcon}>
                <Image
                  src={iconPath}
                  width={24}
                  height={24}
                  alt={"key icon"}
                />
              </i>
              <input
                className={styles.inputContainer}
                type="password"
                placeholder={inputPlaceholder}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            {
              passwordIncorrect &&
              <span className={styles.helper}>
                { helperMessage }
              </span>
            }

          </div>
        </div>


      </div>

      {/* <div className={styles.nextProjectContainer}>
        NEXT
      </div> */}
    </div>  
  )
}




function NextWork({nextSlug, nextTitle}: {nextSlug: string, nextTitle: string}) {
  const styles: any = {
    outerContainer: [
      'w-full',
      'flex flex-col',
      'hover:text-highlight group'
      // 'max-sm:px-4 max-sm:pb-8',
    ].join(' '),
    titleContainer: [
      'w-full px-8',
      'max-sm:px-2 max-sm:gap-4',
    ].join(' '),
    title: [
      'w-full',
      'font-bold h2-text',
      'max-lg:col-span-12 max-xl:col-span-10',
    ].join(' '),
    h1: [
      'w-full',
      'font-display font-bold pt-[6vw]',
      'select-none pointer-events-none',
    ].join(' '),
    jpmorganchase: [
      ' display-jpmc',
    ].join(' '),
    microsoft: [
      ' display-microsoft'
    ].join(' '),
    marriott: [
      ' display-marriott'
    ].join(' '),
    tiktok: [
      ' display-tiktok'
    ].join(' '),
    michaelkors: [
      ' display-mkc'
    ].join(' '),
    riley: [
      ' display-riley !pt-[9vw]'
    ].join(' '),
  }

  const h1ClassName = styles[nextSlug] || ''

  return (
    <Link className={styles.outerContainer} href={"/work/" + nextSlug}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>
          Next project
        </h2>
      </div>

      <h1 className={styles.h1.concat(h1ClassName)}>
        {nextTitle}
      </h1>
    </Link>
  )
}