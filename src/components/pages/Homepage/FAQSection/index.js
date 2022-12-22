import React from "react";
import { Disclosure } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/solid";

function FAQSection(props) {
  return (
    <div id='faq' className='flex flex-col items-center bg-black p-8 md:p-16'>
      <div className='w-full lg:w-7/12 flex flex-col items-center mb-20'>
        <p className='text-[#EC0B26] text-sm xl:text-2xl mb-3'>FAQ</p>
        <p className='text-xl lg:text-4xl xl:text-5xl text-white font-bold text-center'>
          Frequently Asked Questions
        </p>
      </div>
      <div className='w-full md:w-10/12'>
        <div className='mt-6'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between w-full mt-3 px-0 py-5 text-sm font-medium text-left text-white border-gray-400 border-t'>
                  <span>What is The Battle of Haku</span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-45" : "rotate-0"
                    } max-w-[1.25rem] w-full h-5 text-[#EC0B26] transform  transition-all ease-in-out duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-0 pt-4 pb-2 text-sm text-[#6C6C6C]'>
                The Battle of Haku is a play-to-earn NFT Game built on Avalanche. The game pioneers a unique type of NFT mechanics and tokenomics allowing you to monetize your gaming experience with $Haku in an action-packed adventure on Mountain Haku where the battle between the Monks and the Dark Valley Ninjas lives on.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between w-full mt-3 px-0 py-5 text-sm font-medium text-left text-white border-gray-400 border-t'>
                  <span>
                  How can I get whitelisted for The Battle of Haku NFT drop?
                  </span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-45" : "rotate-0"
                    } max-w-[1.25rem] w-full h-5 text-[#EC0B26] transform  transition-all ease-in-out duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-0 pt-4 pb-2 text-sm text-[#6C6C6C]'>
                  Join the Hakuswap Discord, follow the Hakuswap Twitter, and join the Telegram to follow along for whitelist instructions
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between w-full mt-3 px-0 py-5 text-sm font-medium text-left text-white border-gray-400 border-t'>
                  <span>What character classes are available on the Battle of Haku?</span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-45" : "rotate-0"
                    } max-w-[1.25rem] w-full h-5 text-[#EC0B26] transform  transition-all ease-in-out duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-0 pt-4 pb-2 text-sm text-[#6C6C6C]'>
                The Battle of Haku offers several unique characters with upgradeable abilities, strengths, and weaknesses. There are currently two characters, the Monks and the Dark Valley Ninjas.
                <br/><b>The Monks:</b>
                They are tenacious warriors born to serve the spirit of Haku and armed with the vast knowledge of the Temple. They serve to maintain the order on Mount Haku and are the protectors of the light deep within. They are ferocious warriors geared to attain enlightenment with $Haku but are sometimes lured into the shadows when they choose to abandon the temple. They only gain their strength and multiply in number when they maintain $Haku within their reach.
                <br/><b>The Dark Valley Ninjas:</b>
                They are the counterparts of the Monks.They are skilled at harnessing the power of the Monks who abandon the temple. They are adept at mastering new weapons and lurk in the shadows of Mount Haku to kidnap the Monks and steal their $Haku. They frequently change their tactics to beguile the Monks and do anything to win the battle.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between w-full mt-3 px-0 py-5 text-sm font-medium text-left text-white border-gray-400 border-t'>
                  <span>What is the Battle of Haku’s Token? (HAKU)</span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-45" : "rotate-0"
                    } max-w-[1.25rem] w-full h-5 text-[#EC0B26] transform  transition-all ease-in-out duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-0 pt-4 pb-2 text-sm text-[#6C6C6C]'>
                  $HAKU is the utility token of the Battle of Haku NFT game and the basis of transactions and in-game interactions. It is built on the Avalanche blockchain. The token will be used across the ecosystem allowing the players to share a truly unique gaming experience and accumulate rewards during game play.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between w-full mt-3 px-0 py-5 text-sm font-medium text-left text-white border-gray-400 border-t'>
                  <span>Can I earn $Haku tokens through in-game-play?</span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-45" : "rotate-0"
                    } max-w-[1.25rem] w-full h-5 text-[#EC0B26] transform  transition-all ease-in-out duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-0 pt-4 pb-2 text-sm text-[#6C6C6C]'>
                Yes! The in-game token is obtained in many ways:
                <br/>
                - By killing monks or Ninjas
                <br/>
                - Stealing from the Monks
                <br/>
                - Staking and Farming
                <br/>
                - Completing quests
                <br/>
                - Selling in-game items
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between w-full mt-3 px-0 py-5 text-sm font-medium text-left text-white border-gray-400 border-t'>
                  <span>How do I purchase or sell NFTs?</span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-45" : "rotate-0"
                    } max-w-[1.25rem] w-full h-5 text-[#EC0B26] transform  transition-all ease-in-out duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-0 pt-4 pb-2 text-sm text-[#6C6C6C]'>
                  The Battle of Haku NFTs can be purchased with AVAX or HAKU depending on the generation. Please refer to the chart below for mint costs. All new mints will be at the battle.hakuswap.com website.<br/><br/>
                  Token ID    Minting cost <br/>
                  0 to 4999 Gen 0    1 AVAX <br/>
                  5000-6677   1000 HAKU <br/>
                  6678-8343   1250 HAKU <br/>
                  8344-9999   1500 HAKU
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between w-full mt-3 px-0 py-5 text-sm font-medium text-left text-white border-gray-400 border-t'>
                  <span>
                  What would happen if I mint a new Monk using Haku?
                  </span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-45" : "rotate-0"
                    } max-w-[1.25rem] w-full h-5 text-[#EC0B26] transform  transition-all ease-in-out duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-0 pt-4 pb-2 text-sm text-[#6C6C6C]'>
                There is a 5% chance that the NFT is actually a Ninja and 5% chance of the new Monk or Ninja to be stolen by a staked Ninja.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex justify-between w-full mt-3 px-0 py-5 text-sm font-medium text-left text-white border-gray-400 border-t'>
                  <span>
                    What if I have more questions?
                  </span>
                  <PlusIcon
                    className={`${
                      open ? "rotate-45" : "rotate-0"
                    } max-w-[1.25rem] w-full h-5 text-[#EC0B26] transform  transition-all ease-in-out duration-200`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-0 pt-4 pb-2 text-sm text-[#6C6C6C]'>
                Have a question? No problem! Join our socials or read The Battle of Haku Whitepaper. We have moderators and developers standing by to assist.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
