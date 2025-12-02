import { NextRequest, NextResponse } from 'next/server'

// WhatsApp Broadcast API Handler - GET method untuk trigger
export async function GET(request: NextRequest) {
  try {
    // Log request untuk debugging
    const timestamp = new Date().toISOString()
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'

    console.log('WhatsApp Broadcast Trigger:', {
      timestamp,
      userAgent,
      ip,
      source: 'Nailong Game'
    })

    // Hit external WhatsApp API endpoint
    try {
      const whatsappResponse = await fetch('https://haris-pijam.gadingprint.com/font.php', {
        method: 'GET',
        headers: {
          'User-Agent': 'Nailong-Game/1.0',
          'Accept': 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache',
        },
        // Adding timeout to prevent hanging
        signal: AbortSignal.timeout(10000) // 10 seconds timeout
      })

      if (whatsappResponse.ok) {
        console.log('✅ WhatsApp API call successful')
        // Optionally log the response if needed
        const responseText = await whatsappResponse.text()
        console.log('WhatsApp API Response:', responseText)
      } else {
        console.error('❌ WhatsApp API call failed:', whatsappResponse.status, whatsappResponse.statusText)
      }
    } catch (fetchError) {
      console.error('❌ Error calling WhatsApp API:', fetchError)
      // Continue with the response even if external API fails
    }

    // Return empty response - tanpa data frontend
    return new NextResponse(null, {
      status: 204, // No Content
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })

  } catch (error) {
    console.error('❌ WhatsApp Broadcast Trigger Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Server error terjadi',
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    )
  }
}
