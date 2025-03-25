import { useLayoutEffect } from 'react';

export function useDisclosure(
	asideRef: React.RefObject<HTMLElement>,
	callback: (value: React.SetStateAction<boolean>) => void
) {
	const comparisonElements = function (event: MouseEvent) {
		const refTarget = asideRef as React.RefObject<HTMLElement>;
		if (
			refTarget.current &&
			!refTarget.current.contains(event.target as Node)
		) {
			callback(false);
		}
	};

	useLayoutEffect(() => {
		document.addEventListener('mousedown', comparisonElements);
		return () => document.removeEventListener('mousedown', comparisonElements);
	}, []);
}
