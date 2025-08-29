import React, { useMemo, useState } from "react";
import SectionCard from "../../components/ui/section_card";
import { Input }from "../../components/ui/input";
import { NumberInput } from "../../components/ui/number_input";
import Toggle from "../../components/ui/toggle";
import Dropzone from "../../components/ui/dropzone";
import { useWallet } from "@solana/wallet-adapter-react";

type Revokes = { freeze: boolean; mint: boolean; update: boolean };

function Home() {
  const { connected } = useWallet();

  // form state
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(6);
  const [supply, setSupply] = useState<number | string>(1);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // toggles
  const [socialLinks, setSocialLinks] = useState(false);
  const [modifyCreator, setModifyCreator] = useState(false);
  const [customAddress, setCustomAddress] = useState(false);
  const [multiWalletDist, setMultiWalletDist] = useState(false);
  const [dextools, setDextools] = useState(false);
  const [revokes, setRevokes] = useState<Revokes>({ freeze: false, mint: false, update: false });

  // fee calc (примерно, как в скрине)
  const baseFee = 0; // за создание самой формы — 0; сеть возьмёт газ отдельно
  const extra =
    (modifyCreator ? 0.1 : 0) +
    (customAddress ? 0.1 : 0) +
    (multiWalletDist ? 0.1 : 0) +
    (dextools ? 3 : 0) +
    (revokes.freeze ? 0.1 : 0) +
    (revokes.mint ? 0.1 : 0) +
    (revokes.update ? 0.1 : 0);
  const totalFees = useMemo(() => +(baseFee + extra).toFixed(1), [extra]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Solana Token Creator</h1>
            <p className="text-neutral-400 mt-1">Easily Create your own Solana SPL Token in just 7+1 steps without Coding.</p>
          </div>
        </div>

        <SectionCard>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              hint="Max 32 characters in your name"
            />
            <Input
              label="Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Symbol"
              hint="Max 8 characters in your symbol"
            />

            <NumberInput
              label="Decimals"
              value={decimals}
              onChange={setDecimals}
              min={0}
              max={9}
              step={1}
              hint="Most tokens use 6 decimals"
            />
            <NumberInput
              label="Supply"
              value={supply}
              onChange={setSupply}
              min={1}
              max={10_000_000_000}
              step={1}
              hint="Most tokens use 10B"
            />

            <div className="md:col-span-1">
              <label className="text-sm text-neutral-300"><span className="text-rose-400 mr-1">*</span>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                placeholder="Ex: First community token on Solana.."
                className="mt-2 w-full min-h-[140px] rounded-lg bg-neutral-900/80 border border-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-indigo-500"
              />
              <div className="text-right text-xs text-neutral-500">{description.length}/500</div>
            </div>

            <div className="md:col-span-1">
              <label className="text-sm text-neutral-300"><span className="text-rose-400 mr-1">*</span>Image</label>
              <div className="mt-2">
                <Dropzone onFile={setImageFile} />
                {imageFile && (
                  <p className="text-xs text-neutral-400 mt-2">
                    Selected: <span className="text-neutral-200">{imageFile.name}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Add Social links */}
        <div className="border-t border-neutral-800 my-6" />
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-neutral-200">Add Social Links & Tags</h4>
            <p className="text-xs text-neutral-500">Add links to your token metadata.</p>
          </div>
          <Toggle checked={socialLinks} onChange={setSocialLinks} />
        </div>

        {/* Advanced Options */}
        <div className="mt-6">
          <button
            className="text-sm text-neutral-300 flex items-center gap-1"
            onClick={() => {
              document.getElementById("advanced")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Advance Options ▲
          </button>
        </div>

        <div id="advanced" className="mt-4 space-y-6">
          <SectionCard title="Modify Creator Information (+0.1 SOL):">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400 max-w-2xl">
                Change the information of the creator in the metadata, by default it is smithii.
              </p>
              <Toggle checked={modifyCreator} onChange={setModifyCreator} />
            </div>
          </SectionCard>

          <SectionCard title="Custom Address Generator (+0.1 SOL):">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400 max-w-2xl">
                Customize the beginning and/or the end of your token contract address and make the difference. (max. 4 characters)
              </p>
              <Toggle checked={customAddress} onChange={setCustomAddress} />
            </div>
          </SectionCard>

          <SectionCard title="Multi-Wallet Supply Distribution (+0.1 SOL):">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400 max-w-2xl">
                Distribute the supply of your token on different wallets within the creation. (maximum 10 wallets)
              </p>
              <Toggle checked={multiWalletDist} onChange={setMultiWalletDist} />
            </div>
          </SectionCard>

          <SectionCard title="Add DEXTools Socials + Banner (+3 SOL)">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-400 max-w-2xl">
                Add your token information on your DEXTools profile with a discounted price and much faster.
              </p>
              <Toggle checked={dextools} onChange={setDextools} />
            </div>
          </SectionCard>

          <SectionCard title="Revoke Authorities">
            <p className="text-xs text-neutral-500 mb-4">
              Solana Token has 3 authorities: Freeze, Mint, Update. Removing them can attract more investors.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Revoke Freeze</h5>
                  <Toggle checked={revokes.freeze} onChange={(v)=>setRevokes({...revokes, freeze: v})} />
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  No one will be able to freeze holders’ token accounts anymore.
                </p>
                <div className="text-xs text-neutral-400 mt-3">+0.1 SOL</div>
              </div>

              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Revoke Mint</h5>
                  <Toggle checked={revokes.mint} onChange={(v)=>setRevokes({...revokes, mint: v})} />
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  No one will be able to create more tokens anymore.
                </p>
                <div className="text-xs text-neutral-400 mt-3">+0.1 SOL</div>
              </div>

              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">Revoke Update</h5>
                  <Toggle checked={revokes.update} onChange={(v)=>setRevokes({...revokes, update: v})} />
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  No one will be able to modify token metadata anymore.
                </p>
                <div className="text-xs text-neutral-400 mt-3">+0.1 SOL</div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* footer */}
        <div className="mt-8 bg-neutral-950/60 border border-neutral-800 rounded-2xl p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-neutral-400">
              Total Fees: <span className="text-neutral-200">{totalFees} SOL</span>
            </div>
            <button
              disabled={!connected}
              className={[
                "w-full sm:w-auto px-5 py-3 rounded-xl font-semibold transition",
                connected
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-neutral-800 text-neutral-400 cursor-not-allowed",
              ].join(" ")}
              onClick={() => {

                console.log({
                  name, symbol, decimals, supply, description, imageFile,
                  toggles: { socialLinks, modifyCreator, customAddress, multiWalletDist, dextools, revokes }
                });
                alert("Form captured. Next step: wire up SPL-token creation.");
              }}
            >
              {connected ? "Create Token" : "Connect Wallet"}
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Network fees (rent + tx) оплачиваются кошельком отдельно.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Home;