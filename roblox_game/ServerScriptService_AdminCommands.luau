--[[
  СИСТЕМА ПРИВИЛЕГИЙ ВЛАДЕЛЬЦА И АДМИН-КОМАНД (Owner System & Admin Commands)
  Поместите этот скрипт в ServerScriptService
]]

local Players = game:GetService("Players")

-- Укажите здесь ваш точный ник в Roblox:
local OWNER_NAME = "Ваш_Ник_В_Роблокс"

-- Функция создания титула над головой владельца
local function createOwnerTag(character)
	local head = character:WaitForChild("Head", 5)
	if not head then return end

	local billboard = Instance.new("BillboardGui")
	billboard.Name = "OwnerTag"
	billboard.Size = UDim2.new(0, 160, 0, 40)
	billboard.StudsOffset = Vector3.new(0, 2.5, 0)
	billboard.AlwaysOnTop = true

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(1, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.Text = "👑 ВЛАДЕЛЕЦ СЕРВЕРА"
	label.TextColor3 = Color3.fromRGB(255, 215, 0) -- Золотой цвет
	label.TextStrokeTransparency = 0
	label.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
	label.Font = Enum.Font.GothamBlack
	label.TextScaled = true
	label.Parent = billboard

	billboard.Parent = head
end

local function isOwner(player)
	-- Проверка: создатель плейса или указанный ник
	return player.UserId == game.CreatorId or player.Name:lower() == OWNER_NAME:lower()
end

Players.PlayerAdded:Connect(function(player)
	-- Если зашел владелец
	if isOwner(player) then
		player.CharacterAdded:Connect(function(character)
			createOwnerTag(character)
		end)
	end

	-- Обработка чат-команд
	player.Chatted:Connect(function(message)
		if not isOwner(player) then return end

		local args = string.split(message, " ")
		local cmd = args[1] and args[1]:lower() or ""

		-- Команда: :kick [ник]
		if cmd == ":kick" and args[2] then
			local target = Players:FindFirstChild(args[2])
			if target and target ~= player then
				target:Kick("Вы были исключены владельцем сервера.")
			end

		-- Команда: :speed [число]
		elseif cmd == ":speed" and args[2] then
			local speed = tonumber(args[2])
			if speed and player.Character and player.Character:FindFirstChild("Humanoid") then
				player.Character.Humanoid.WalkSpeed = speed
			end

		-- Команда: :givecoins [ник] [количество]
		elseif cmd == ":givecoins" and args[2] and args[3] then
			local target = Players:FindFirstChild(args[2])
			local amount = tonumber(args[3])
			if target and amount and target:FindFirstChild("leaderstats") then
				local coins = target.leaderstats:FindFirstChild("Монеты")
				if coins then
					coins.Value += amount
				end
			end

		-- Команда: :tp [ник]
		elseif cmd == ":tp" and args[2] then
			local target = Players:FindFirstChild(args[2])
			if target and target.Character and player.Character then
				local targetRoot = target.Character:FindFirstChild("HumanoidRootPart")
				local myRoot = player.Character:FindFirstChild("HumanoidRootPart")
				if targetRoot and myRoot then
					myRoot.CFrame = targetRoot.CFrame + Vector3.new(0, 2, 0)
				end
			end
		end
	end)
end)
