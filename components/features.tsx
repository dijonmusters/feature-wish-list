import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

const Features = () => {
  const {
    data: features,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["features"], async () => {
    const { data, error } = await supabase
      .from("features")
      .select("id, title")
      .order("created_at", { ascending: false });
    if (error) throw error;

    return data;
  });

  return (
    <div className="py-2">
      <Link href="/features/new">
        <a className="px-2 py-2 bg-blue-200 mb-2">Request New Feature</a>
      </Link>
      <div>
        {isSuccess &&
          features.map((feature) => {
            return (
              <div className="py-1 " key={feature.id}>
                <Link href={`/features/${feature.id}`}>
                  <a className="text-lg pr-2">{feature.title}</a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Features;
