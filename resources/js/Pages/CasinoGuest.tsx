import { Link, Head } from "@inertiajs/react";
import { CasinoPageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import CasinoGames from "@/Components/CasinoGames";
import Promocode from "@/Components/Promocode";
import FreespinNotification from "@/Components/FreespinNotification";
import RegisterModal from "@/Components/RegisterModal";
import LoginModal from "@/Components/LoginModal";

export default function CasinoGuest({
  auth,
  showOptions,
  games,
}: CasinoPageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title="Welcome" />
      <div className="relative sm:justify-center sm:items-center min-h-screen bg-center bg-theme-800 selection:bg-red-500 selection:text-white">
        <div className="relative p-6 text-right">
          {auth.user ? (
            <>
              <Link
                href="#"
                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                <Button variant="outline" disabled>
                  {auth.user.usd > 0
                    ? (auth.user.usd / 100).toFixed(2)
                    : "0.00"}
                  $
                </Button>
              </Link>
              <Link
                href={route("logout")}
                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                <Button variant="outline">Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-end mt-4">
                <LoginModal />
              <div
                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
              >
                  <RegisterModal />
              </div>
              </div>
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto">
          {auth.user ? (
            <>
              {auth.user.fs_available === 1 ? (
                <div className="mt-2">
                  <FreespinNotification freespins={auth.user.fs_spins} />
                </div>
              ) : (
                <></>
              )}

              <div className="mt-2">
                <CasinoGames games={games} showOptions={showOptions} />
              </div>
              <div className="mt-2">
                <Promocode status={status} />
              </div>
            </>
          ) : (
            <>
              <div className="mt-2">
                <CasinoGames games={games} showOptions={showOptions} />
              </div>
            </>
          )}

          <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
            <div className="ml-5 mb-5 text-center text-xs text-theme-200 sm:text-right sm:ml-0">
              <Link className="opacity-0 underline hover:text-theme-50" href="https://t.me/ryanwest777">@ryanwest777</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
