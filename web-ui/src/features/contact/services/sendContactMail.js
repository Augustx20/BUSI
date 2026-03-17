export async function sendContactMail(payload) {
  const response = await fetch('/mail/envio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    return { ok: true }
  }

  let body = null
  try {
    body = await response.json()
  } catch {
    body = null
  }

  return {
    ok: false,
    status: response.status,
    body,
  }
}

