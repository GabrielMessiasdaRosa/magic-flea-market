"use client";
import { useGetCards } from "@/api-handlers/api-hooks/cards/use-cards";
import { useGetProfiles } from "@/api-handlers/api-hooks/profiles/use-get-profiles";
import useDebounce from "@/hooks/use-debounce";
import { searchInputStore } from "@/store/search-input-store";
import { Divider, Input, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
export interface SearchCardInputProps {}
type Input = {
  criteria: string;
};

export default function SearchInput({}: SearchCardInputProps) {
  const { isOpen, setIsOpen } = searchInputStore();
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Input>();
  const { data: cards, refetch: refatchCards } = useGetCards({
    criteria: getValues("criteria"),
    take: 20,
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
  const inputRef = useRef<HTMLInputElement>(null);
  const hasValue = Boolean(watch("criteria")) && isOpen;
  return (
    <form>
      <Input
        ref={inputRef}
        {...(register("criteria"),
        {
          value: watch("criteria"),
          onChange: (e) => setValue("criteria", e.target.value),
          onFocus: () => {
            setIsOpen(true);
          },
          onBlur: () => {
            setIsOpen(false);
          },
        })}
        className="w-full"
        classNames={{
          inputWrapper: "lg:h-10",
        }}
        placeholder="Pequise por cards ou usuários"
      />
      {hasValue && (
        <motion.div
          onFocus={() => {
            setIsOpen(true);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
          ref={inputRef}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute mt-2 flex max-h-[80dvh] w-full flex-col gap-4 rounded-lg border bg-white shadow-lg"
        >
          <ul className="max-h-[80dvh] overflow-hidden overflow-y-scroll">
            <li className="px-4 py-2 ">Cards</li>
            {cards?.map((card, index) => (
              <Link
                key={card.name! + index}
                href={`/cards/${card.id}`}
                className="flex cursor-pointer flex-wrap justify-between px-4 py-2 hover:bg-primary-100 hover:underline"
              >
                <li className="flex w-full cursor-pointer flex-col items-start">
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
                  <div className="text flex flex-wrap items-center justify-center truncate ">
                    <p className="pt-2 text-xs text-gray-400">
                      {card.set_name}
                    </p>
                  </div>
                </li>
              </Link>
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
                <Link href={`/profiles/${profile.id}`} className="w-full">
                  <div className="flex  w-full items-center justify-between ">
                    <div className="flex items-center gap-2 ">
                      <Image
                        alt=""
                        src={profile.user.image!}
                        width={30}
                        height={30}
                      />
                      <span>{profile.nickname}</span>
                    </div>
                    <div className="font-black text-gray-600">
                      RP:{profile.reputationPoints}
                    </div>
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
