"use client";
import { useGetCards } from "@/api-handlers/api-hooks/cards/use-cards";
import { useGetProfiles } from "@/api-handlers/api-hooks/profiles/use-get-profiles";
import useDebounce from "@/hooks/use-debounce";
import { Divider, Input, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
export interface SearchCardInputProps {}
type Input = {
  criteria: string;
};

export default function SearchInput({}: SearchCardInputProps) {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Input>();
  const { data: cards, refetch: refatchCards } = useGetCards({
    criteria: getValues("criteria"),
    take: 3,
    skip: 0,
  });

  const { data: profiles, refetch: refatchProfiles } = useGetProfiles({
    criteria: getValues("criteria"),
    take: 3,
    skip: 0,
  });
  useDebounce({
    value: watch("criteria"),
    delay: 250, // esta erradi ten qye ac=rryna r
    onDebounce: (value) => {
      setValue("criteria", value);
      refatchCards();
      refatchProfiles();
    },
  });
  const hasValue = Boolean(watch("criteria"));
  return (
    <form>
      <Input
        {...register("criteria")}
        className="md:w-96"
        classNames={{
          inputWrapper: "h-10",
        }}
        placeholder="Pequise por cards ou usuários"
      />
      {hasValue && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="h-50 absolute mt-2 flex w-full flex-col gap-4 rounded-lg border bg-white shadow-lg"
        >
          <ul className="overflow-hidden">
            <li className="px-4 py-2 ">Cards</li>
            {cards?.map((card, index) => (
              <li
                key={card.name! + index}
                className="cursor-pointer px-4 py-2 hover:bg-primary-100 hover:underline"
              >
                <Link href={`/cards/${card.id}`}>
                  <div className="flex  items-center gap-2 ">
                    <Image
                      alt=""
                      src={
                        card.image_uris?.small || "/images/mtg-card-back.png"
                      }
                      width={30}
                      height={30}
                    />
                    <p className="truncate">{card.name}</p>
                  </div>
                </Link>
              </li>
            ))}
            {cards?.length === 0 && (
              <li className="px-4 py-2 text-gray-500">
                Nenhum card encontrado
              </li>
            )}
          </ul>
          <Divider />
          <ul>
            <li className="px-4 py-2 ">Usuários</li>

            {profiles?.map((profile, index) => (
              <li
                key={profile.nickname! + index}
                className="cursor-pointer px-4 py-2 hover:bg-primary-100 hover:underline"
              >
                <Link href={`/profiles/${profile.id}`}>
                  <div className="flex  items-center gap-2 ">
                    <Image
                      alt=""
                      src={profile.user.image!}
                      width={30}
                      height={30}
                    />
                    {profile.nickname}
                  </div>
                </Link>
              </li>
            ))}
            {profiles?.length === 0 && (
              <li className="px-4 py-2 text-gray-500">
                Nenhum usuário encontrado
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </form>
  );
}
