import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Col, Row, Typography, Card, Avatar, Select } from "antd";
import moment from "moment";
import Loader from "./Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  console.log("cryptoNews", cryptoNews);
  if (!cryptoNews?.value) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Select.Option value="Cryptocurency">Cryptocurrency</Select.Option>
            {data?.data?.coins?.map((currency) => (
              <Select.Option value={currency.name}>
                {currency.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Typography.Title className="news-title" level={4}>
                  {news.name}
                </Typography.Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt=""
                />
              </div>
              <p>
                {news?.description > 100
                  ? `${news?.description.substring(0, 100)}...`
                  : news?.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=""
                  />
                  <Typography.Text className="provider-name">
                    {news.provider[0]?.name}
                  </Typography.Text>
                </div>
                <Typography.Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Typography.Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
