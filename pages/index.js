import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import HTMLFlipBook from "react-pageflip";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { sources } from "../sources";
import { encodeURLString } from "../utils/utils";
import Controls from "../components/Controls";
import PageCover from "../components/PageCover";
import Page from "../components/Page";
import { loadState } from "../context/browser-storage";
import { StoreContext } from "../context/StoreProvider";
import { CHANGE_LANG } from "../context/type";

export default function Home({ allPages, brands }) {
	const [page, setPage] = useState(0);
	const [isSafari, setIsSafari] = useState(false);
	const { state, dispatch } = useContext(StoreContext);
	const { t } = useTranslation("common");
	const flipBook = useRef();
	const lang = loadState("lang", {
		name: "ru",
		flag: "ru",
	});
	const router = useRouter();

	const nextPage = () => flipBook.current.pageFlip().flipNext();

	const prevPage = (target) =>
		target === "desktop"
			? flipBook.current.pageFlip().flipPrev()
			: flipBook.current.pageFlip().turnToPrevPage();

	const pageFlip = (page, corner) =>
		flipBook.current.pageFlip().flip(page, corner);

	const onPage = (e) => {
		setPage(e.data);
	};

	const firstPage = (target) =>
		target === "desktop"
			? flipBook.current.pageFlip().flip(0, ["top", "bottom"])
			: flipBook.current.pageFlip().turnToPage(0);

	const lastPage = () => {
		const totalPage = flipBook.current.pageFlip().getPageCount();
		flipBook.current.pageFlip().flip(totalPage - 1, ["top"]);
	};

	useEffect(() => {
		if (navigator.userAgent) {
			setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
		}
		dispatch({
			type: CHANGE_LANG,
			payload: lang,
		});
		if (router.locale !== lang.name)
			router.push(router.asPath, router.asPath, {
				locale: lang.name,
			});
	}, []);

	const currentPage = allPages.find(
		(brand) => brand.title.toLowerCase() === state.targetBrand.toLowerCase()
	);

	return (
		<>
			<div
				style={{
					height: "100vh",
					transition: "all 0.5s ease-in-out",
				}}
				className="d-flex flex-column align-items-center justify-content-start overflow-hidden py-2 py-md-3">
				<HTMLFlipBook
					style={{
						transition: "all 0.5s ease-in-out",
					}}
					width={550}
					height={733}
					minWidth={315}
					maxWidth={600}
					minHeight={420}
					maxHeight={733}
					size="stretch"
					maxShadowOpacity={0.5}
					showCover={true}
					mobileScrollSupport={true}
					onFlip={onPage}
					swipeDistance={60}
					disableFlipByClick={true}
					className="demo-book"
					ref={flipBook}>
					<PageCover pages={pages} brands={brands} nextPage={nextPage} />

					{currentPage.data
						.filter((curr) => curr.length > 0)
						.map((page, index) => (
							<Page key={`${index}.|`} className="page" number={index}>
								<div className="row m-0 p-0">
									<div className="col-12 border-bottom position-relative">
										<p className="text-center page-title fw-bold mb-1">
											{currentPage.title === "new" ||
											currentPage.title === "popular"
												? t(currentPage.title)
												: currentPage.title}
										</p>
										<p className="text-center page-title position-absolute top-0 ps-2 mb-1 fw-bold">
											{index + 1}
										</p>
									</div>
									{page.map((pageItem, i) => (
										<div
											key={`${i}.||._`}
											className="col-4 px-2 page-item-wrapper">
											<a
												className="d-flex flex-column align-items-center"
												href={`https://solastore.com.tr/detail/${encodeURLString(
													pageItem.productShortName
												)}:${pageItem.masterProductID}?selected=${
													pageItem.productID
												}`}
												target="_blank">
												<img
													src={`${sources.imageMidSrc}${pageItem.picture_1}`}
													alt={pageItem.productShortName}
													className={`${
														!isSafari ? "page-image" : ""
													} img-fluid overflow-hidden`}
												/>
												<p className="text-center title fw-bold mb-0">
													{pageItem.productShortName}
												</p>
												<p
													style={{
														color: "var(--color-primary)",
													}}
													className="text-center price">
													{pageItem.singlePrice}$
												</p>
											</a>
										</div>
									))}
								</div>
							</Page>
						))}
				</HTMLFlipBook>
				<Controls
					currentPage={page}
					nextPage={nextPage}
					prevPage={prevPage}
					firstPage={firstPage}
					lastPage={lastPage}
					dataLength={allPages.length}
				/>
			</div>
		</>
	);
}

const pages = [
	{
		title: "new",
		pageNumber: 1,
	},
	{
		title: "popular",
		pageNumber: 4,
	},
];

export async function getServerSideProps() {
	let allPages = [];
	try {
		const [{ data: newProducts }, { data: popularProducts }, { data: brands }] =
			await Promise.all([
				axios.get(
					`https://api.solastore.com.tr/api/Product/GetNewProducts?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
				),
				axios.get(
					`https://api.solastore.com.tr/api/Product/GetBestSellerProducts?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
				),
				axios.get(
					`https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
				),
			]);

		const newProductsFiltered = newProducts.filter((product) => {
			return product.picture_1 !== null;
		});

		// allPages = [
		// 	{
		// 		title: "new",
		// 		data: newProductsFiltered.slice(0, 6),
		// 	},
		// 	{
		// 		title: "new",
		// 		data: newProductsFiltered.slice(6, 12),
		// 	},
		// 	{
		// 		title: "new",
		// 		data: newProductsFiltered.slice(12, 18),
		// 	},
		// 	{ title: "popular", data: popularProducts.slice(0, 6) },
		// 	{ title: "popular", data: popularProducts.slice(6, 12) },
		// ];

		// allPages = [
		// 	{
		// 		title: "new",
		// 		data: newProductsFiltered.slice(0, 50),
		// 	},

		// 	{ title: "popular", data: popularProducts.slice(0, 50) },
		// ];

		await Promise.all(
			brands.map(async ({ brandName, brandID }) => {
				const { data: brandData } = await axios.get(
					`https://api.solastore.com.tr/api/Product/GetSelectedBrandProducts?BrandID=${brandID}&lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
				);

				allPages.push({
					title: brandName,
					data: [
						brandData.slice(0, 6),
						brandData.slice(6, 12),
						brandData.slice(12, 18),
						brandData.slice(18, 24),
						brandData.slice(24, 30),
						brandData.slice(30, 36),
						brandData.slice(36, 42),
						brandData.slice(42, 48),
						brandData.slice(48, 54),
						brandData.slice(54, 60),
						brandData.slice(60, 66),
						brandData.slice(66, 72),
						brandData.slice(72, 78),
					],
				});
				// allPages.push({
				// 	title: brandName,
				// 	data: brandData.reverse().slice(0, 6),
				// });
			})
		);

		return {
			props: {
				// allPages: [
				// 	...allPages.slice(0, 5),
				// 	...allPages
				// 		.slice(5, allPages.length)
				// 		.sort((a, b) => a.title.localeCompare(b.title)),
				// ],
				allPages,
				brands: brands
					.sort((a, b) => a.brandName.localeCompare(b.brandName))
					.map((item, i) => ({
						...item,
						pageNum: 5 + i + 1,
					})),
			},
		};
	} catch (err) {
		console.log(err);
		return {
			props: {
				allPages: [],
				brands: [],
			},
		};
	}
}
