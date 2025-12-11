export async function GET() {
    try {
        const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=NPR');
        const data = await res.json();

        return Response.json({
            rate: data.rates.NPR
        })
    } catch (err) {
        return Response.json(
            { error: 'Failed to fetch exchange rate' },
            { status: 500 }
        )
    }
}