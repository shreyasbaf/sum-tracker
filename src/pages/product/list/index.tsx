import { FC, SetStateAction, useEffect, useState } from "react";
import ResultString from "../../../components/content/result.content";
import Heading from "../../../components/heading/basic.heading";
import Pagination from "../../../components/pagination/basic.pagination";
import { PAGINATION_LIMIT } from "../../../constants/app.constants";
import { PaginateDataType, UrlType } from "../../../interface/common";
import { listProducts } from "../../../services/products";
import { getQueryFromUrl } from "../../../utils/common.utils";
import ProductsTable from "./components/products.table";
import { searchContact } from "../../../services/search";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const fixedListParams = {
  paginate: true,
};

const DivWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  &:focus-within div {
    visibility: visible;
    background: #d9d9d9;
    overflow: auto;
    max-height: 300px;
    width: 100%;
  }
`;

const ProductList: FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoding] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginateDataType>({
    next: null,
    prev: null,
    count: null,
    resultsCount: 0,
    offset: null,
    hasOffset: true,
    limit: PAGINATION_LIMIT,
  });

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearchInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    init();
  }, [window.location.search]);

  const init = async () => {
    loadProducts();
  };

  const loadProducts = async (queryParams?: Record<string, any>) => {
    let query = queryParams || {};
    setLoding(true);
    try {
      // Get the "Contact" parameter from the URL
      const urlSearchParams = new URLSearchParams(window.location.search);
      const contactParam = urlSearchParams.get("contact");

      // Add the "Contact" parameter to the query
      if (contactParam) {
        query = { ...query, contact: contactParam };
      }
      const res = await listProducts({
        query: { ...fixedListParams, ...query },
      });

      setProducts(res.data.results);
      setPagination((prev) => {
        return {
          ...prev,
          next: res.data.next,
          prev: res.data.previous,
          count: res.data.count,
          resultsCount: res.data.results.length,
          offset: query?.offset ? Number(query.offset) : null,
        };
      });
    } catch (err) {
      console.log(err);
    }
    setLoding(false);
  };

  const handleNext = (next: UrlType) => {
    if (next === null) {
      return;
    }
    let query = getQueryFromUrl(next);
    loadProducts(query);
  };

  const handlePrev = (prev: UrlType) => {
    if (prev === null) {
      return;
    }
    let query = getQueryFromUrl(prev);
    loadProducts(query);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = async () => {
    const res = await searchContact({
      query: { search: search },
    });
    setSearchResult(res.data.results);
  };

  const handleCompanyClick = (id: any) => {
    navigate(`/products/?contact=${id}`);
  };

  const handleReset = () => {
    setSearch("");
    navigate("/products/");
  };
  return (
    <>
      <DivWrapper>
        <input
          type="search"
          placeholder="Search"
          value={search}
          onChange={handleSearchInputChange}
          style={{ padding: "1rem", width: "60%" }}
        />
        <div
          style={{
            position: "absolute",
            width: "60%",
            zIndex: "10",
            visibility: "hidden",
          }}
        >
          <div style={{ padding: "1rem" }}>
            {searchResult &&
              searchResult.map((item, index) => {
                return (
                  <p
                    key={index}
                    onMouseDown={() => handleCompanyClick(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.company_name}
                  </p>
                );
              })}
          </div>
        </div>
      </DivWrapper>
      <Button onClick={() => handleReset()}>Reset</Button>
      <Heading titleLevel={2}>Products</Heading>
      <div
        style={{
          backgroundColor: "white",
          padding: "0.5rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <ResultString
                loading={loading}
                pagination={pagination}
                pageString={"product"}
              />
            </div>
            <div>
              <Pagination
                next={pagination.next}
                prev={pagination.prev}
                onNextClick={handleNext}
                onPrevClick={handlePrev}
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <ProductsTable list={products} loading={loading} />
        </div>
        <div>
          <Pagination next={pagination.next} prev={pagination.prev} />
        </div>
      </div>
    </>
  );
};

export default ProductList;
