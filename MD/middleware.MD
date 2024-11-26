<!-- WORKS BUT MADE WITH CHATGPT -->

export async function middleware(request) {
const isAuthed = await auth.api.getSession({
headers: request.headers,
})
console.log(isAuthed)

if (!isAuthed) {
return NextResponse.redirect(new URL('/LogIn', request.url))
}

return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
matcher: '/Dashboard/:path\*',
}

<!-- WORKS BUT MADE WITH CHATGPT -->

<!-- Confusing one -->

export async function middleware(request) {
if (request.nextUrl.pathname === '/api/auth/get-session') {
return NextResponse.next()
}
const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
headers: {
cookie: request.headers.get('cookie') || '',
},
})

const session = await response.json()
console.log(data, error)

if (!session) {
return NextResponse.redirect(new URL('/LogIn', request.url))
}

return NextResponse.next()

}

export const config = {
matcher: '/Dashboard/:path\*',
}

<!-- Confusing one -->
