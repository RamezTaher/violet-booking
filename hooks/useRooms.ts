import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export function useRooms(queries) {
	const { data, error, mutate } = useSWR(
		`${process.env.NEXT_PUBLIC_API}/Hotels/groupedAvailabaleRooms/${process.env.NEXT_PUBLIC_VIOLET_ID}?data.checkIn=${queries.checkin}&data.checkOut=${queries.checkout}&data.promoCode=${queries.promocode}`,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
  );
  console
	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
