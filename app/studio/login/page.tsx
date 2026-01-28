export const dynamic = "force-dynamic";

type Props = {
  searchParams?: { error?: string; from?: string };
};

export default function StudioLoginPage({ searchParams }: Props) {
  const error = searchParams?.error === "1";
  const from = searchParams?.from || "/studio";

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-4 py-12">
      <div className="w-full rounded-2xl border border-border bg-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Sanity Studio Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your studio credentials to continue.
        </p>
        <form method="POST" action="/studio/login/submit" className="mt-6 space-y-4">
          <input type="hidden" name="from" value={from} />
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
              required
            />
          </div>
          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Invalid credentials. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
