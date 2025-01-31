const isAuthed = (await request.headers.get('cookie')) || ''
const returnURL = request.url

// HAR BRUK DEN UNDER OG DEN FUNKET FINT - TESTER BARE KJAPT MED UTEN "returnTo= tingen"
if (!isAuthed) {
return NextResponse.redirect(new URL(`/LogIn`))
}

return NextResponse.next()
