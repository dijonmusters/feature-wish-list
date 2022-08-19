import { RealtimeChannel } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import supabase from "../../lib/supabase";
import Spinner from "../../components/Spinner";

let channel: RealtimeChannel | null = null;

if (typeof window !== "undefined") {
  if (!channel) {
    channel = supabase.channel("celebrations");

    channel
      .on("broadcast", { event: "celebrate" }, (event: any) => {
        console.log("getTHingy", event);
      })
      .subscribe();
  }
}

const FeaturePage = () => {
  const [upvoteCount, setUpvoteCount] = useState<number>(0);

  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  const {
    data: feature,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    ["feature", id],
    async () => {
      const { data, error } = await supabase
        .from("features")
        .select()
        .eq("id", id)
        .single();
      if (error) throw error;

      return data;
    },
    { enabled: Boolean(id) }
  );

  useEffect(() => {
    setUpvoteCount(feature?.upvote_count ?? 0);
  }, [feature]);

  useEffect(() => {
    supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "features" },
        (payload: any) => console.log(payload)
      )
      .subscribe();
  }, []);

  const vote = async () => {
    const { error } = await supabase.from("votes").insert({
      feature_id: id!,
    });
  };

  // const channelRef = useRef<RealtimeChannel | null>(null);

  // useEffect(() => {
  //   channelRef.current = supabase.channel("celebrations", {
  //     configs: {
  //       broadcast: { ack: true },
  //     },
  //   });

  //   channelRef.current
  //     .on("broadcast", { event: "celebrate" }, (event: any) => {
  //       console.log("event", event);
  //     })
  //     .subscribe(async (status) => {
  //       console.log("status", status);
  //     });

  //   return () => {
  //     // channelRef.current?.unsubscribe();
  //   };
  // }, []);

  const celebrate = async () => {
    if (!id || !channel || !channel.isJoined) {
      throw new Error("Can't yet celebrate");
    }

    const result = await channel.send({
      type: "broadcast",
      event: "celebrate",
      payload: { id },
    });
    console.log("result", result);
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      {isSuccess && (
        <div>
          <h1 className="text-3xl pb-4">{feature.title}</h1>

          <button className="px-4 py-2 bg-green-200 mr-2" onClick={celebrate}>
            🎉 Celebrate
          </button>
          <button className="px-4 py-2 bg-blue-200" onClick={vote}>
            👍 Up Vote {upvoteCount}
          </button>
        </div>
      )}

      {isLoading && <Spinner />}
    </div>
  );
};

export default FeaturePage;
