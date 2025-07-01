export const updateUserBanner = async (imageUrl: string) => {
  const res = await fetch('/api/update-user-banner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      banner: imageUrl,
    }),
  });

  const data = await res.json();
  if (data.success) {
    console.log('User updated');
  }
};