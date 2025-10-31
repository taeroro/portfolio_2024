import { serialize } from "cookie";

/****************************************************/
/*                                                  */
/* Set Password Protect Cookie                      */
/*                                                  */
/****************************************************/

export async function POST(request: Request, params: { slug: string }) {
  const data: { password: string } = await request.json();
  const password = data.password;
  const expireTime = 60 * 60 * 1000 // 1 hour

  const cookie = serialize(
    process.env.PASSWORD_COOKIE_NAME!,
    "true",
    {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + expireTime),
      secure: true, //uncomment when publishing the site
    }
  );

  if (process.env.PAGE_PASSWORD !== password) {
    return new Response("incorrect password", {
      status: 401,
    });
  }

  return new Response("password correct", {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
 });
}