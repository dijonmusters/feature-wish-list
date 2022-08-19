import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { FormEventHandler } from "react";
import { useRouter } from "next/router";
import { withAuth } from "../../lib/auth";
import supabase from "../../lib/supabase";

const NewFeaturePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    undefined,
    PostgrestError,
    { title: string }
  >(
    async ({ title }) => {
      const { error } = await supabase.from("features").insert({ title });
      if (error) {
        throw error;
      }

      return undefined;
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries(["features"]);

        router.push("/");
      },
    }
  );

  const submitNewFeature: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title")?.toString();
    if (!title) {
      alert("No title provided");
      return;
    }

    mutate({ title });
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <form onSubmit={submitNewFeature}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="My New Feature"
          required
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default withAuth(NewFeaturePage);
