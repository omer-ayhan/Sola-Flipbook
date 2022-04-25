import React from "react";
import useTranslation from "next-translate/useTranslation";

import { sources } from "../../sources";

const PageCover = React.forwardRef(({ pages, brands, pageFlip }, ref) => {
	const { t } = useTranslation("common");

	return (
		<div className="page page-cover pt-2" ref={ref} data-density="hard">
			{/* <div className="w-100 d-flex align-items-center justify-content-center">
				<img
					className="logo"
					// src="public/img/placeholder.jpg"
					src="/img/placeholder.jpg"
					alt=""
				/>
			</div> */}
			<div className="d-flex flex-column justify-content-start w-100 px-5 ">
				<div className="top-head d-flex align-items-center">
					<img
						className="logo me-3"
						// src="public/img/placeholder.jpg"
						src="/img/placeholder.jpg"
						alt="Sola Store"
					/>
					<div className="w-100">
						{pages.map(({ title, pageNumber }) => (
							<a
								key={`${pageNumber}.||`}
								onClick={() => pageFlip(pageNumber, ["top", "bottom"])}
								className="d-flex justify-content-between mb-2 cursor-pointer">
								<p className="align-self-start cover-title fw-normal mb-0">
									{t(title)}
								</p>
								<p className="align-self-start cover-title fw-normal mb-0">
									{pageNumber}
								</p>
							</a>
						))}
					</div>
				</div>
				<div className="row justify-content-center">
					{brands.map((brandItem, i) => (
						<div
							key={`${i}._!`}
							onClick={() => pageFlip(brandItem.pageNum, ["top"])}
							className="col-2 cursor-pointer brand d-flex justify-content-center">
							<img
								className="brand brand-img"
								src={`${sources.brand}${brandItem.guidName}`}
								alt={brandItem.brandName}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
});

export default PageCover;
