export async function onRequestPost(context) {
    try {
        const data = await context.request.json();
        
        // 1. Verify Cloudflare Turnstile Captcha
        const turnstileVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${context.env.TURNSTILE_SECRET_KEY}&response=${data.turnstileToken}`
        });
        
        const turnstileOutcome = await turnstileVerify.json();
        if (!turnstileOutcome.success) {
            return new Response(JSON.stringify({ error: 'Captcha verification failed.' }), { status: 400 });
        }

        // 2. Prepare Resend Email Format
        const emailBody = {
            from: 'MyFixer Bookings <bookings@myfixer.co.za>', // Replace with your verified Resend domain email
            to: ['your-alert-email@gmail.com'], // Where you want to receive booking notices
            subject: `🚨 New Booking: ${data.name} (${data.urgency.toUpperCase()})`,
            html: `
                <h2>New Repair Appointment Request</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
                <p><strong>Appliance:</strong> ${data.appliance}</p>
                <p><strong>Service Type:</strong> ${data.serviceType}</p>
                <p><strong>Address:</strong> ${data.address}</p>
                <p><strong>Preferred Date/Time:</strong> ${data.appointment}</p>
                <p><strong>Urgency Level:</strong> ${data.urgency}</p>
                <p><strong>Message/Details:</strong><br>${data.message || 'None'}</p>
            `
        };

        // 3. Send via Resend API using secure Environment Key
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailBody)
        });

        if (!resendResponse.ok) {
            const errText = await resendResponse.text();
            return new Response(JSON.stringify({ error: 'Resend API error', details: errText }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}